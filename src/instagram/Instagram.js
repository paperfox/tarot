import React, { useState, useEffect } from 'react';
import InstaImage from './InstaImage';
import InstaAltLabel from './InstaAltLabel';
import AltTextArray from '../static/Alt-text';

function InstagramPage() {
  const [instaPost, setInstaPost] = useState([]);

  const instaAltText = AltTextArray();

  var valUrl = 'https://paperfox-instagramFeed.web.val.run';

  useEffect(() => {
    fetch(valUrl)
    .then((response) => response.json())
    .then((data) => {
      setInstaPost(data.data);
    });
  }, [valUrl]);

  return (
    <div className="container-xxl">
      <div className="row justify-content-center">
        <div className="col-md-11 col-lg-10">
          <h1 className="text-center">Instagram Feed</h1>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <p className="mb-5 text-center">Latest sketches, recently finished work, and sassy dog pictures. Click on any image to see the full post over on instagram.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            {instaPost.map((instaData) => {
              return (
                <InstaImage
                  key={instaData.id}
                  dataId={instaData.id}
                  mediaUrl={instaData.media_url}
                  link={instaData.permalink}
                />
              )
            })}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4 align-self-center text-center">
              <a href="https://www.instagram.com/paperfoxmakesart/" target="_blank" rel="noreferrer"  className="instagram-link">
                <div><img src="../images/instagramlogo.svg" alt="instagram" /></div>
                View more on instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        {instaAltText.map((altData) => {
          return (
            <InstaAltLabel
              key={altData.altId}
              altId={altData.altId}
              altText={altData.altText}
            />
          )
        })}
      </div>
    </div>
  );
}

export default InstagramPage;