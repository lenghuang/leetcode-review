import heroImage from "@/assets/heroImage.jpg";

export const metadata = {
  title: "Leetcode Review",
  description: "Quickly refresh your memory on LeetCode problems.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8 flex w-full flex-col justify-center bg-primary">
        <div
          className="min-h-64 max-w-7xl rounded-br-2xl bg-primary bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage.src})`,
            clipPath: "ellipse(64rem 32rem at 0% 10%)",
          }}
        />
        <h1 className="p-8 text-6xl font-medium text-base-100">
          Leetcode Review
        </h1>
      </div>
      <div className="flex min-h-96 flex-1">{children}</div>
    </>
  );
}
