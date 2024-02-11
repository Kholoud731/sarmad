const TableErrorComponent = () => (
  <div className="error-page">
    <div className="oops">Oops!</div>
    <div className="message">Something went wrong...</div>
    <div className="button" onClick={() => window.location.reload()}>
      Refresh The Page
    </div>
  </div>
);

export default TableErrorComponent;
