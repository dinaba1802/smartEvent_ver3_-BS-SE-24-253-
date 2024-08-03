import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";

import "react-carousel-animated/dist/style.css";

export default function ImageSlider({ images }) {
  return (
    <ReactCarousel
      containerStyle={{
        marginInline: "auto",
        overflow: "hidden",
        maxWidth: "95%",
      }}
      carouselConfig={{
        transform: {
          rotateY: {
            [BEFORE]: () => "rotateY(25deg)",
            [CENTER]: () => "rotateY(0deg)",
            [AFTER]: () => "rotateY(-25deg)",
          },
        },
      }}
      itemBackgroundStyle={{
        backgroundColor: "#ece4db",
        borderRadius: "3px",
        boxShadow: "8px 12px 14px -6px black",
      }}
      containerBackgroundStyle={{
        filter: "blur(7px)",
      }}
      itemMaxWidth={50}
      carouselHeight="350px"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="test"
          style={{
            maxHeight: "300px",
            maxWidth: "400px",
            borderRadius: "20px",
            boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
            margin: ".5rem",
          }}
        />
      ))}
    </ReactCarousel>
  );
}
