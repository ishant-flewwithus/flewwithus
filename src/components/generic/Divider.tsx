interface DividerProps {
  gap?: number;
}

export default function Divider({ gap = 0.75 }: DividerProps) {
  return (
    <div
      className={`border-grey-300 border`}
      style={{
        margin: gap + "rem" + " 0px",
      }}
    ></div>
  );
}
