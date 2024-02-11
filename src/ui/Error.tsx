type ErrorProps = {
  msg?: string;
};

const Error: React.FC<ErrorProps> = ({ msg }) => (
  <div className="error-page">
    <div className="oops">Oops!</div>
    <div className="message">{msg || 'Something went wrong...'}</div>
    <div className="button" onClick={() => window.location.reload()}>
      Refresh The Page
    </div>
  </div>
);

export default Error;
