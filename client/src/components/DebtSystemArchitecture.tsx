import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SystemNode {
  id: string;
  name: string;
  type: 'source' | 'mechanism' | 'outcome' | 'victim';
  value: number;
  description: string;
}

interface SystemFlow {
  source: string;
  target: string;
  value: number;
  type: 'creates' | 'enforces' | 'extracts' | 'limits';
}

export default function DebtSystemArchitecture() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);

  const nodes: SystemNode[] = [
    { id: 'banks', name: 'Private Banks', type: 'source', value: 90, description: 'Create 90% of money through debt issuance' },
    { id: 'interest', name: 'Interest Mechanism', type: 'mechanism', value: 3.5, description: 'Ensures perpetual extraction via compound interest' },
    { id: 'scarcity', name: 'Artificial Scarcity', type: 'outcome', value: 75, description: 'Restricts access despite physical abundance' },
    { id: 'poverty', name: 'Structural Poverty', type: 'outcome', value: 85, description: 'Engineered outcome, not natural phenomenon' },
    { id: 'households', name: 'Households', type: 'victim', value: 59, description: '$59T in debt obligations globally' },
    { id: 'governments', name: 'Governments', type: 'victim', value: 91, description: '$91T public debt limits policy choices' },
    { id: 'businesses', name: 'Businesses', type: 'victim', value: 164, description: '$164T business debt drives profit extraction' },
    { id: 'extraction', name: 'Wealth Extraction', type: 'mechanism', value: 11, description: '$11T annual upward wealth transfer' }
  ];

  const flows: SystemFlow[] = [
    { source: 'banks', target: 'interest', value: 100, type: 'creates' },
    { source: 'interest', target: 'extraction', value: 90, type: 'enforces' },
    { source: 'extraction', target: 'scarcity', value: 80, type: 'creates' },
    { source: 'scarcity', target: 'poverty', value: 95, type: 'enforces' },
    { source: 'banks', target: 'households', value: 60, type: 'extracts' },
    { source: 'banks', target: 'governments', value: 70, type: 'limits' },
    { source: 'banks', target: 'businesses', value: 85, type: 'extracts' },
    { source: 'extraction', target: 'households', value: 50, type: 'limits' },
    { source: 'extraction', target: 'governments', value: 60, type: 'limits' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    
    svg.selectAll("*").remove();

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(flows).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(flows)
      .enter().append("line")
      .attr("stroke", (d) => {
        switch (d.type) {
          case 'creates': return '#ef4444';
          case 'enforces': return '#f97316';
          case 'extracts': return '#dc2626';
          case 'limits': return '#991b1b';
          default: return '#64748b';
        }
      })
      .attr("stroke-width", (d) => Math.sqrt(d.value / 10))
      .attr("stroke-opacity", 0.8);

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", (d) => Math.sqrt(d.value) * 2 + 15)
      .attr("fill", (d) => {
        switch (d.type) {
          case 'source': return '#dc2626';
          case 'mechanism': return '#ea580c';
          case 'outcome': return '#7c2d12';
          case 'victim': return '#1e40af';
          default: return '#64748b';
        }
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        setSelectedNode(d);
      })
      .call(d3.drag<SVGCircleElement, SystemNode>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Create labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .style("pointer-events", "none")
      .text((d) => d.name);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });
  }, []);

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800 col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Debt System Architecture</h3>
          <p className="text-slate-400 text-sm">How debt creates scarcity and poverty</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-slate-300">Control Mechanisms</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-slate-300">Impact Targets</span>
          </div>
        </div>
      </div>

      <div className="relative h-96 bg-slate-800 rounded-lg overflow-hidden mb-4">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
          viewBox="0 0 600 400"
        />
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-slate-700 rounded-lg p-3 text-sm max-w-64">
            <div className="text-white font-medium mb-1">{selectedNode.name}</div>
            <div className="text-slate-300 text-xs leading-relaxed">
              {selectedNode.description}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-600">
              <div className="text-slate-400 text-xs">
                Type: {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-800 rounded p-3">
          <div className="text-red-400 font-semibold mb-1">Creates Dependency</div>
          <div className="text-slate-300">Money creation through debt ensures perpetual obligations</div>
        </div>
        <div className="bg-slate-800 rounded p-3">
          <div className="text-orange-400 font-semibold mb-1">Enforces Scarcity</div>
          <div className="text-slate-300">Interest extraction limits access despite abundance</div>
        </div>
        <div className="bg-slate-800 rounded p-3">
          <div className="text-amber-400 font-semibold mb-1">Concentrates Wealth</div>
          <div className="text-slate-300">Systematic transfer from debtors to creditors</div>
        </div>
        <div className="bg-slate-800 rounded p-3">
          <div className="text-red-500 font-semibold mb-1">Maintains Poverty</div>
          <div className="text-slate-300">Structural outcome, not individual failure</div>
        </div>
      </div>
    </div>
  );
}