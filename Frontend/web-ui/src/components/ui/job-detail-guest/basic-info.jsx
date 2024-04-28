import React from "react";

// Basic info
function ImageGallery() {
    const images = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5daf5335140db7fa166023188d3eb55c01cfa497937c6436722a294b7d9b22d?apiKey=1293b2add2d347908b4e11760098fdbe&", alt: "Image 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f597843af9118c35cf06855884e728e0b64fe41eafcf1502c4f4fcd91a5129d0?apiKey=1293b2add2d347908b4e11760098fdbe&", alt: "Image 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c0626a6a4a2acda85275ab5536f06c95177df1a626adecf3aaca0e4d6ce3e6f2?apiKey=1293b2add2d347908b4e11760098fdbe&", alt: "Image 3" },
    ];

    return (
      <div className="image-gallery" style={{ zIndex: 0 }}>
          {images.map((image, index) => (
              <div key={index} className={`image-column ${index === 2 ? "last-image" : ""}`} style={{ zIndex: 0 }}>
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                  {index === 2 && <div className="image-overlay">+2</div>}
              </div>
          ))}
      </div>
  );
}

function IconText({ iconSrc, text, alt }) {
    return (
        <div className="icon-text">
            <img src={iconSrc} alt={alt} className="basic-info-icon" />
            <div className="text">{text}</div>
        </div>
    );
}

function SkillTags() {
    const skills = ["Flutter", "React Native", "Dart"];

    return (
        <div className="skill-tags">
            <div className="skill-label">Kỹ năng:</div>
            <div className="skill-list">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-tag">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
}



function JobDetails() {
    return (
        <article className="job-details">
            <ImageGallery />
            <div className="job-info">
                <IconText
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c0626a6a4a2acda85275ab5536f06c95177df1a626adecf3aaca0e4d6ce3e6f2?apiKey=1293b2add2d347908b4e11760098fdbe&"
                    text="Havana Tower - 132 Ham Nghi, District 1, Ho Chi Minh"
                    alt="Location icon"
                />
                <IconText iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd2125e9fd97fbb5b3b13bcb2bdf6e326626587444b795c48309c9c97f097f40?apiKey=1293b2add2d347908b4e11760098fdbe&" text="Tại văn phòng" alt="Office icon" />
                <IconText iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/6d831fdaf31e8169acfb119810b46f9bf0bba65340e3dda6252b5f6ef449a66b?apiKey=1293b2add2d347908b4e11760098fdbe&" text="Đăng 3 ngày trước" alt="Calendar icon" />
            </div>
            <SkillTags />
        </article>
    );
}


function BasicInfo() {
    return (
        <>
            <JobDetails />

            <style jsx>{`
          .job-details {
            border-radius: 0 0 8px 8px;
            box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.08);
            background-color: #fff;
            display: flex;
            // max-width: 893px;
            flex-direction: column;
            align-items: start;
            padding: 16px 20px 36px;
            z-index: 0;
          }
  
          .image-gallery {
            display: flex;
            gap: 20px;
            width: 100%;
          }
  
          @media (max-width: 991px) {
            .image-gallery {
              flex-direction: column;
              gap: 9px;
            }
          }
  
          .image-column {
            width: 33%;
            position: relative;
          }
  
          @media (max-width: 991px) {
            .image-column {
              width: 100%;
            }
          }
  
          .gallery-image {
            aspect-ratio: 1.49;
            object-fit: cover;
            width: 100%;
          }
  
          .last-image {
            position: relative;
          }
  
          .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
  
          .job-info {
            margin-top: 28px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            color: #414042;
            font-size: 16px;
            line-height: 1.5;
          }
  
          .icon-text {
            display: flex;
            align-items: center;
            gap: 8px;
          }
  
          .basic-info-icon {
            width: 16px;
            height: 16px;
          }
  
          .skill-tags {
            margin-top: 19px;
            display: flex;
            align-items: center;
            gap: 19px;
            color: #414042;
            line-height: 1.5;
          }
  
          .skill-label {
            font-size: 14px;
            font-family: Lexend, sans-serif;
          }
  
          .skill-list {
            display: flex;
            gap: 4px;
            font-size: 12px;
          }
  
          .skill-tag {
            font-family: Lexend, sans-serif;
            border-radius: 20px;
            border: 1px solid #dedede;
            background-color: #fff;
            padding: 10px 11px;
            white-space: nowrap;
          }
  
          @media (max-width: 991px) {
            .skill-tag {
              white-space: normal;
            }
          }
        `}</style>
        </>
    );
}

export default BasicInfo;