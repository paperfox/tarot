function SectionDesc({ sectionData }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="list-container pf--mb-1-half">
        <div id={sectionData.id}>
          <h2>{sectionData.sectionTitle}</h2>
          {sectionData.description && <p>{sectionData.description}</p>}
        </div>
      </div>
    </div>
  );
}

export default SectionDesc;
