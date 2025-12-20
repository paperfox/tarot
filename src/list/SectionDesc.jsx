function SectionDesc({ sectionData }) {
  return (
    <div className="flex-center">
      <div className="list-container mb-1-half">
        <div id={sectionData.id}>
          <h2>{sectionData.sectionTitle}</h2>
          {sectionData.description && <p>{sectionData.description}</p>}
        </div>
      </div>
    </div>
  );
}

export default SectionDesc;
