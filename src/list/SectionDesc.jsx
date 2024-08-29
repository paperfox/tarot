import React from 'react';

function SectionDesc({ sectionData }) {
  return (
    <div className="row justify-content-center">
      <div className="col-xl-9 col-lg-10 mb-4">
        <div id={sectionData.id}>
          <h2>{sectionData.sectionTitle}</h2>
          {sectionData.description && <p>{sectionData.description}</p>}
        </div>
      </div>
    </div>
  );
}

export default SectionDesc;


