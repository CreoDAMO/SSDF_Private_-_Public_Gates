import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkLink } from '@/types/debt';
import { createNetworkSimulation, getNodeColor, getNodeRadius, createTooltip } from '@/lib/d3-utils';

export default function DebtNetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const nodes: NetworkNode[] = [
    { id: "USA", name: "United States", value: 33000000000000, type: "country" },
    { id: "China", name: "China", value: 14800000000000, type: "country" },
    { id: "Japan", name: "Japan", value: 10100000000000, type: "country" },
    { id: "EU", name: "European Union", value: 13600000000000, type: "country" },
    { id: "Financial", name: "Financial Sector", value: 70400000000000, type: "sector" }
  ];

  const links: NetworkLink[] = [
    { source: "USA", target: "China", value: 867000000000, type: "debt_flow" },
    { source: "China", target: "Japan", value: 234000000000, type: "debt_flow" },
    { source: "EU", target: "Financial", value: 890000000000, type: "debt_flow" },
    { source: "USA", target: "Financial", value: 1200000000000, type: "debt_flow" }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 320;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create tooltip
    const tooltip = createTooltip();

    // Create simulation
    const simulation = createNetworkSimulation(nodes, links, width, height);

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("class", "debt-flow-line")
      .attr("stroke", "#60A5FA")
      .attr("stroke-width", (d) => Math.sqrt(d.value / 100000000000) * 2)
      .attr("stroke-opacity", 0.6);

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "network-node")
      .attr("r", (d) => getNodeRadius(d.value, 70400000000000))
      .attr("fill", (d) => getNodeColor(d.type))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Debt: $${(d.value / 1e12).toFixed(1)}T<br/>
          Type: ${d.type}
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", getNodeRadius(d.value, 70400000000000) * 1.2);
      })
      .on("mouseout", function(event, d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", getNodeRadius(d.value, 70400000000000));
      })
      .on("click", function(event, d) {
        setSelectedNode(d);
      })
      .call(d3.drag<SVGCircleElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Create labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "network-label")
      .attr("text-anchor", "middle")
      .attr("dy", 35)
      .attr("fill", "#E2E8F0")
      .attr("font-size", "10px")
      .text((d) => d.name);

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      label
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y!);
    });

    function dragstarted(event: any, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: NetworkNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Global Debt Flow Network</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm hover:bg-slate-600 transition-colors">
            <i className="fas fa-expand"></i>
          </button>
          <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm hover:bg-slate-600 transition-colors">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
      <div className="relative h-80 bg-slate-800 rounded-lg overflow-hidden">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
          viewBox="0 0 500 320"
        />
        <div className="absolute bottom-4 left-4 text-xs text-slate-400">
          Click nodes for detailed analysis
        </div>
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-slate-700 rounded-lg p-3 text-sm">
            <div className="text-white font-medium">{selectedNode.name}</div>
            <div className="text-slate-300">
              ${(selectedNode.value / 1e12).toFixed(1)}T debt
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
