package com.Servify.controller;

import lombok.Data;

@Data
public class ProviderLogUpDTO implements DTOServify{

    private String name;
    private String phoneNmbr;
    private String celPhoneNmbr;
    private String webPage;
    private String residence;

    public ProviderLogUpDTO(String name, String phoneNmbr, String celPhoneNmbr, String webPage, String residence){
        this.name = name;
        this.phoneNmbr = phoneNmbr;
        this.celPhoneNmbr = celPhoneNmbr;
        this.webPage = webPage;
        this.residence = residence;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if(name == null || phoneNmbr == null || celPhoneNmbr == null || webPage == null || residence == null ||
                name.isEmpty() || phoneNmbr.isEmpty() || celPhoneNmbr.isEmpty() || webPage.isEmpty() || residence.isEmpty()){
            throw new EmptyDTOError();//Fran hace refactor en este if
        }
    }

    public String getCelNmbr() {
        return this.celPhoneNmbr;
    }

    public String getWebPage() {
        return this.webPage;
    }

    public String getName() {
        return this.name;
    }

    public String getResidence() {
        return this.residence;
    }

    public String getPhoneNmbr() {
        return this.phoneNmbr;
    }
}
