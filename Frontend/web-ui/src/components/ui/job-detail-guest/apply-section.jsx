import * as React from "react";

function ApplyJobSection(props)  {
  return (
    <>
      <article className="job-listing">
        <header>
          <h2 className="job-title">Senior Mobile Developer (Flutter)</h2>
          <div className="company-name-apply">Trusting Social</div>
        </header>
        <div className="salary-info">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/10393afa7a68c37e5d79e02f15483fe0e4df12465c247bd00ae595589676c069?apiKey=1293b2add2d347908b4e11760098fdbe&" alt="" className="icon" />
          <div className="salary-text">Đăng nhập để xem mức lương</div>
        </div>
        <footer className="actions">
          <button className="apply-button">Ứng tuyển</button>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f676638eb622bada169d4802a01de4c3ea227849a483bf0f62307c67761cc4c?apiKey=1293b2add2d347908b4e11760098fdbe&" alt="" className="bookmark-icon" />
        </footer>
      </article>

      <style jsx>{`
        .job-listing {
          background-color: #fff;
          border-radius: 8px 8px 0px 0px;
          color: #414042;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          font-weight: 700;
          line-height: 150%;
          // max-width: 893px;
          padding: 33px 20px 12px;
          z-index: 1;
        }

        .job-title {
          color: #121212;
          font: 32px Lexend, sans-serif;
          font-size: 28px;
          font-weight: 700;
          padding: 0 0 20px 0;
          margin: 0;
        }

        @media (max-width: 991px) {
          .job-title {
            max-width: 100%;
          }
        }

        .company-name-apply {
          font-family: Lexend, sans-serif;
          font-size: 16px;
          color: #414042;
          margin: 16px 0px 12px;
        }

        @media (max-width: 991px) {
          .company-name-apply {
            max-width: 100%;
          }
        }

        .salary-info {
          align-self: start;
          display: flex;
          gap: 8px;
          font-size: 18px;
          margin-top: 15px;
        }

        .icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 24px;
        }

        .salary-text {
          flex-basis: auto;
          flex-grow: 1;
          font-family: Lexend, sans-serif;
          text-decoration-line: underline;
        }

        .actions {
          display: flex;
          gap: 16px;
          color: #fff;
          font-weight: 600;
          margin-top: 26px;
          height: 48px;
        }

        @media (max-width: 991px) {
          .actions {
            flex-wrap: wrap;
            max-width: 100%;
          }
        }

        .apply-button {
          align-items: center;
          background-color: #ed1b2f;
          border-color: rgba(237, 27, 47, 1);
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          flex-grow: 1;
          font-family: Lexend, sans-serif;
          justify-content: center;
          padding: 15px 60px;
          width: fit-content;
        }

        @media (max-width: 991px) {
          .apply-button {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .bookmark-icon {
          aspect-ratio: 1;
          margin: auto 0;
          object-fit: auto;
          object-position: center;
          width: 32px;
        }
      `}</style>
    </>
  );
}
export default ApplyJobSection;