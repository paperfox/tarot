function InstaImage({ dataId, mediaUrl, link }) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
      <a href={link} target="_blank" rel="noreferrer">
        <img src={mediaUrl} key={dataId} aria-labelledby={dataId} className="w-100 instagram-formatting rounded"/>
      </a>
    </div>
  );
}

export default InstaImage;