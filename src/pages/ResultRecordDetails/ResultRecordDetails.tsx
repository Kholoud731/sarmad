import { Link, useLocation } from 'react-router-dom';

const ResultsRecordDetails = () => {
  const location = useLocation();

  const { name, nat, des, score, birth } = location.state;

  return (
    <div className="record-container">
      <div className="record-container-body">
        <div className="record-row">
          <h1 className="">{name}</h1>
        </div>

        <div className="record-row">
          <span className="record-row-title">Natonality</span>
          <span>{nat}</span>
        </div>

        <div className="record-row">
          <span className="record-row-title">Score</span>
          <span>{score}</span>
        </div>

        <div className="record-row">
          <span className="record-row-title">Discription</span>
          <span>{des}</span>
        </div>

        <div className="record-row">
          <span className="record-row-title">Place of Birth</span>
          <span>{`${birth || 'Not Known'}`}</span>
        </div>

        <div className="record-actions">
          <div className="button">
            <Link to="/">Return To The List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsRecordDetails;
