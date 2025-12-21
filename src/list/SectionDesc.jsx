function SectionDesc({ sectionData }) {
  return (
    <div className="mb-3">
      <div id={sectionData.id}>
        <h2>{sectionData.sectionTitle}</h2>
        {sectionData.description && <p>{sectionData.description}</p>}
      </div>
    </div>
  );
}

export default SectionDesc;
