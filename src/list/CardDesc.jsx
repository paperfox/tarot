import CardModal from '../CardModal';

function CardDesc({ dataContent }) {
  return (
    <>
      <div className="d-flex gap-1-half justify-content-center">
        <div className="list-left mb-2">
          <CardModal dataImg={dataContent.cardValue} dataContent={dataContent} modalDeck={false} />
        </div>
        <div className="list-right mb-1-half">
          <h3>{dataContent.title}</h3>
          <h4>{dataContent.uprightTitle}</h4>
          <p className="mb-3">{dataContent.uprightCard}</p>
          <h4>{dataContent.reverseTitle}</h4>
          <p>{dataContent.reverseCard}</p>
          {dataContent.link && (
            <p className="pt-1-half">
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
      <div className="d-flex justify-content-center">
        <hr className="w-75 mb-4" />
      </div>
    </>
  );
}

export default CardDesc;
