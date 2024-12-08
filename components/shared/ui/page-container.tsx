type Props = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: Props) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-10`}
    >
      {children}
    </div>
  );
};
