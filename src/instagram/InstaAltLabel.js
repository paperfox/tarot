function InstaAltLabel({ altId, altText }) {
  return (
    <p className="visually-hidden" id={altId}>
        {altText}
    </p>
  );
}

export default InstaAltLabel;