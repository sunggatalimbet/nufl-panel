type Props = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: Props) => {
  return (
    <div className={`flex min-h-screen flex-col items-center gap-10 px-2 py-4`}>
      {children}
    </div>
  );
};
