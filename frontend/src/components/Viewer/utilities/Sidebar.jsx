import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ highlights, toggleDocument, resetHighlights }) => {
  const updateHash = (highlight) => {
    document.location.hash = `highlight-${highlight.id}`;
  };
  return (
    <div className="sidebar" style={{ width: "25vw", maxWidth: "500px" }}>
      {/* Description section */}
      <div
        className="description"
        style={{ textAlign: "center", padding: "1rem" }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Notes</h1>

        <hr></hr>

        <p>
          <small>
            To create an area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      {/* Highlights list */}
      {highlights && (
        <ul className="sidebar__highlights">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={() => {
                updateHash(highlight);
              }}
            >
              <div>
                {/* Highlight comment and text */}
                <strong>{highlight.comment}</strong>
                {highlight.content.text && (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                )}

                {/* Highlight image */}
                {highlight.content.image && (
                  <div
                    className="highlight__image__container"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <img
                      src={highlight.content.image}
                      alt={"Screenshot"}
                      className="highlight__image"
                    />
                  </div>
                )}
              </div>

              {/* Highlight page number */}
              <div className="highlight__location">
                Page {highlight.position.boundingRect.pageNumber}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div style={{ padding: "0.5rem" }}>
        <button onClick={toggleDocument} className="sidebar__toggle">
          Toggle PDF document
        </button>
      </div>

      {highlights && highlights.length > 0 && (
        <div style={{ padding: "0.5rem" }}>
          <button onClick={resetHighlights} className="sidebar__reset">
            Reset highlights
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
