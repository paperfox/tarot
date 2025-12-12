function SectionDesc({ sectionData }) {
  return (
    <div className="row justify-content-center">
      <div className="col-xl-9 col-lg-10 pf--mb-1-half">
        <div id={sectionData.id}>
          <h2>{sectionData.sectionTitle}</h2>
          {sectionData.description && <p>{sectionData.description}</p>}
        </div>
      </div>
    </div>
  );
}

export default SectionDesc;
