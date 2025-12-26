'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  color: string;
  size: number;
}

interface Connection {
  from: Node;
  to: Node;
  active: boolean;
}

const colors = [
  'rgb(var(--neon-cyan))',
  'rgb(var(--neon-pink))',
  'rgb(var(--neon-purple))',
  'rgb(var(--neon-green))',
  'rgb(var(--accent-ai))',
];

export default function InteractiveNeuralNetwork({ 
  nodeCount = 12,
  containerRef 
}: { 
  nodeCount?: number;
  containerRef?: React.RefObject<HTMLElement>;
}) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes: Node[] = [];
      const width = containerRef?.current?.clientWidth || window.innerWidth;
      const height = containerRef?.current?.clientHeight || window.innerHeight;

      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          connections: [],
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
        });
      }

      // Create connections (each node connects to 2-3 nearby nodes)
      newNodes.forEach((node, index) => {
        const nearbyNodes = newNodes
          .map((n, i) => ({ node: n, index: i, distance: Math.sqrt(Math.pow(node.x - n.x, 2) + Math.pow(node.y - n.y, 2)) }))
          .filter(n => n.index !== index)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 2 + Math.floor(Math.random() * 2))
          .map(n => n.index);
        
        node.connections = nearbyNodes;
      });

      setNodes(newNodes);

      // Generate connection array
      const newConnections: Connection[] = [];
      newNodes.forEach(node => {
        node.connections.forEach(connId => {
          if (!newConnections.find(c => 
            (c.from.id === node.id && c.to.id === connId) || 
            (c.from.id === connId && c.to.id === node.id)
          )) {
            newConnections.push({
              from: node,
              to: newNodes[connId],
              active: false,
            });
          }
        });
      });
      setConnections(newConnections);
    };

    generateNodes();

    const handleResize = () => {
      generateNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      generateNodes();
    });

    // Capture the current ref value to use in cleanup
    const currentContainer = containerRef?.current;

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
      currentContainer.addEventListener('mousemove', handleMouseMove);
    }

    window.addEventListener('resize', handleResize);

    // Animate connections
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        active: Math.random() > 0.7,
      })));
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount]);

  const getDistance = (node: Node) => {
    return Math.sqrt(Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2));
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Connections */}
        {connections.map((conn, index) => {
          const distance = Math.min(
            getDistance(conn.from),
            getDistance(conn.to)
          );
          const intensity = distance < 200 ? 1 - distance / 200 : 0;
          const isHovered = hoveredNode === conn.from.id || hoveredNode === conn.to.id;

          return (
            <motion.line
              key={`${conn.from.id}-${conn.to.id}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={conn.from.color}
              strokeWidth={conn.active || isHovered ? 1.5 : 0.5}
              opacity={conn.active || isHovered ? 0.6 : 0.2 * (1 + intensity)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const distance = getDistance(node);
        const scale = distance < 150 ? 1.5 : 1;
        const isHovered = hoveredNode === node.id;

        return (
          <motion.div
            key={node.id}
            className="absolute rounded-full cursor-pointer pointer-events-auto"
            style={{
              left: node.x,
              top: node.y,
              width: node.size,
              height: node.size,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? scale * 1.5 : scale,
              opacity: isHovered ? 1 : 0.7,
            }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        );
      })}
    </div>
  );
}

