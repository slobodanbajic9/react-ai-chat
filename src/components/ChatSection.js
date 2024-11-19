import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

const ChatSection = ({ history, isLoading, input, setInput, handleSubmit }) => (
  <>
    <ChatHistory history={history} isLoading={isLoading} />
    <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
  </>
);

export default ChatSection;
