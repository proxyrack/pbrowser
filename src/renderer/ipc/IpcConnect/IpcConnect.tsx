interface IConnect {
  children: JSX.Element;
}

function IpcConnect({ children }: IConnect) {
  return children;
}

export default IpcConnect;
