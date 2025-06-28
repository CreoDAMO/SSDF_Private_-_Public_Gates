import * as d3 from 'd3';
import { NetworkNode, NetworkLink } from '@/types/debt';

export function createNetworkSimulation(
  nodes: NetworkNode[],
  links: NetworkLink[],
  width: number,
  height: number
) {
  return d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(30));
}

export function getNodeColor(type: string): string {
  switch (type) {
    case 'country':
      return '#3B82F6'; // Blue
    case 'sector':
      return '#10B981'; // Emerald
    case 'institution':
      return '#F59E0B'; // Amber
    default:
      return '#6B7280'; // Gray
  }
}

export function getNodeRadius(value: number, maxValue: number): number {
  const minRadius = 15;
  const maxRadius = 35;
  return minRadius + (value / maxValue) * (maxRadius - minRadius);
}

export function formatDebtAmount(amount: number): string {
  if (amount >= 1e12) {
    return `$${(amount / 1e12).toFixed(1)}T`;
  } else if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else {
    return `$${amount.toLocaleString()}`;
  }
}

export function createColorScale(domain: number[], range: string[]) {
  return d3.scaleLinear<string>()
    .domain(domain)
    .range(range);
}

export function createTooltip() {
  return d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "10px")
    .style("background", "rgba(0, 0, 0, 0.8)")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("font-size", "12px")
    .style("z-index", "1000");
}

export function animateNode(selection: d3.Selection<any, any, any, any>) {
  return selection
    .transition()
    .duration(300)
    .attr("r", (d: any) => getNodeRadius(d.value, 1000000000000) * 1.2)
    .transition()
    .duration(300)
    .attr("r", (d: any) => getNodeRadius(d.value, 1000000000000));
}
