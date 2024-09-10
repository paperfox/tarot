import CardModal from '../CardModal';

function CardDesc({ dataContent }) {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-4 col-6 mb-4">
          <CardModal dataImg={dataContent.cardValue} dataContent={dataContent} modalDeck={false} />
        </div>
        <div className="col-lg-6 col-md-7 col-sm-8 mb-4">
          <h3>{dataContent.title}</h3>
          <h4>{dataContent.uprightTitle}</h4>
          <p className="mb-5">{dataContent.uprightCard}</p>
          <h4>{dataContent.reverseTitle}</h4>
          <p>{dataContent.reverseCard}</p>
          {dataContent.link && (
            <p className="pt-4">
              <small>
                Characters from{' '}
                <a href={dataContent.link} target="_blank" rel="noreferrer">
                  {dataContent.linkText}
                </a>
              </small>
            </p>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-7 col-10">
          <hr className="mb-5" />
        </div>
      </div>
    </>
  );
}

export default CardDesc;
