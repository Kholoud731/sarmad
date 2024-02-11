import { Link } from 'react-router-dom';
import { ResultRecordDetails } from '../../types';

type ListProps = {
  results: ResultRecordDetails[];
};

const ResultsList: React.FC<ListProps> = ({ results }) => (
  <table>
    <thead>
      <tr>
        <th style={{ maxWidth: '350px' }}>Name</th>
        <th>Birth Place</th>
        <th>Description</th>
        <th style={{ maxWidth: '40px' }}>Score</th>
        <th>Nationality</th>
        <th style={{ maxWidth: '90px' }}>Details</th>
      </tr>
    </thead>
    <tbody>
      {results.map((res: ResultRecordDetails) => (
        <tr key={res.id}>
          <td>{res.name}</td>
          <td>{`${res.birth || 'Not Known'}`}</td>
          <td>{res.des}</td>
          <td>{res.score}</td>
          <td>{res.nat}</td>
          <td className="button table-action">
            <Link to={`users/${res.id}`} state={res}>
              Visit
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultsList;
