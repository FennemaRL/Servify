package integration.cucumber;

public class NameAlreadyInUseError extends Error{
    public NameAlreadyInUseError(String message) {
        super(message);
    }
}
