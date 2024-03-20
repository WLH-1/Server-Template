export type UseProvideReturn<
  Key extends string,
  Context extends React.Context<any>
> = {
  [P in `${Capitalize<Key>}Provider`]: Context["Provider"];
} & {
  [V in `${Capitalize<Key>}Value`]: React.ComponentProps<
    Context["Provider"]
  >["value"];
};
