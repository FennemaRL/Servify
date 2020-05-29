package integration.cucumber;

public class KeyboardNotBroke {
    private Integer received = 0 ;
    public void giveNpunches(Integer npunches) {
        received=npunches;
    }

    public Boolean isBroke() {
        return ! received.equals(0);
    }
}
