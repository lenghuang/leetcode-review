import heroImage from "@/assets/heroImage.jpg";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative bg-primary">
        <h1
          style={{
            backgroundColor: "rgba(94,129,172,0.6)",
            boxShadow: "0 0 50px 50px rgb(94,129,172,0.6)",
          }}
          className="absolute z-10 m-2 bg-primary p-4 text-6xl font-medium text-base-100"
        >
          Leetcode Review
        </h1>

        <div
          className="h-64 bg-contain bg-right bg-no-repeat"
          style={{
            backgroundColor: "white",
            backgroundImage: `url(${heroImage.src})`,
            clipPath: "ellipse(16rem 16rem at 100% 50%)",
          }}
        ></div>
      </div>
      {children}
    </div>
  );
}
