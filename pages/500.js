function StaticError() {
  return <div>
    <h1 className='error-code'>500</h1>
    <div className='error-description-block'>
      <h2 className='error-description'>Server-side error occurred.</h2>
    </div>
  </div>;
}
export default StaticError;