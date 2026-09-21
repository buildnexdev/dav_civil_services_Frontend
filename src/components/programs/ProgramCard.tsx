import { Link } from 'react-router-dom';
import type { Program } from '../../data/programsData';
import { ZOHO_APPLY_URL } from '../../constants/links';
import './ProgramCard.css';

interface ProgramCardProps {
  program: Program;
  index?: number;
}

const ProgramCard = ({ program, index = 0 }: ProgramCardProps) => {
  return (
    <div
      className="program-card-v2"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="pc-icon-wrap">
        <span className="pc-icon" role="img" aria-label={program.name}>
          {program.icon}
        </span>
      </div>

      <span className="pc-category">{program.category}</span>

      <h3 className="pc-name">{program.name}</h3>

      <p className="pc-desc">{program.shortDescription}</p>

      <div className="pc-tags">
        {program.preparationAreas.slice(0, 5).map((area) => (
          <span className="pc-tag" key={area}>
            {area}
          </span>
        ))}
        {program.preparationAreas.length > 5 && (
          <span className="pc-tag pc-tag-more">
            +{program.preparationAreas.length - 5} more
          </span>
        )}
      </div>

      <div className="pc-actions">
        <Link to={`/programs/${program.slug}`} className="pc-learn-more">
          Learn More <span className="pc-arrow">→</span>
        </Link>
        <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="pc-apply">
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default ProgramCard;
