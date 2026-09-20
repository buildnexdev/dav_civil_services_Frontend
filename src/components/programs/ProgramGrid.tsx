import { useEffect, useRef, useState } from 'react';
import ProgramCard from './ProgramCard';
import type { Program } from '../../data/programsData';
import './ProgramGrid.css';

interface ProgramGridProps {
  programs: Program[];
}

const ProgramGrid = ({ programs }: ProgramGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={`program-grid-v2 ${visible ? 'pg-visible' : ''}`}
    >
      {programs.map((program, i) => (
        <ProgramCard key={program.id} program={program} index={i} />
      ))}
    </div>
  );
};

export default ProgramGrid;
