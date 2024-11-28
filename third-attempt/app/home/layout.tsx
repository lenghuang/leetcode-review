import heroImage from "@/assets/heroImage.jpg";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative bg-primary">
        <div
          style={{
            backgroundColor: "rgba(94,129,172,0.3)",
            boxShadow: "4rem 0 96rem rgb(94,129,172,0.7)",
          }}
          className="absolute z-10 m-4 p-4 text-base-100"
        >
          <h1 className="text-6xl font-medium">Leetcode Review</h1>
          <p className="text-l">
            An easy way to review key concepts and practice data structures and
            algorithms questions.
          </p>
        </div>
        <div
          className="h-64 bg-contain bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage.src})`,
            clipPath: "ellipse(16rem 16rem at 100% 50%)",
          }}
        ></div>
      </div>
      {children}
    </div>
  );
}
