interface ObjectiveCardProps {
  title: string;
  description: string;
  iconFile: string;
  color: string;
}

export function ObjectiveCard({ title, description, iconFile, color }: ObjectiveCardProps) {
  return (
    <div
      className="objective-card"
      style={{
        width: "28vw",
        height: "40vh",
        background: "#fff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "left"
      }}
    >
      <div
        style={{
          width: "60px",
          aspectRatio: "1 / 1",
          background: color,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
          flexShrink: 0
        }}
      >
        <img
          src={iconFile}
          alt={title}
          style={{
            width: "32px",
            height: "32px"
          }}
        />
      </div>

      <h2 className="objective-card__title">{title}</h2>
      <p className="objective-card__description">{description}</p>
    </div>
  );
}