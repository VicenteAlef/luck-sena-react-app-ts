export const Title = ({ children }: { children: string }) => {
  return (
    <h1 className="text-3xl sm:text-4xl font-bold text-cyan-900">{children}</h1>
  );
};
export const Title2 = ({ children }: { children: string }) => {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-cyan-900">{children}</h2>
  );
};

export const Ball = ({ children }: { children: string }) => {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-cyan-600 rounded-full text-2xl text-white font-bold">
      {children}
    </div>
  );
};
