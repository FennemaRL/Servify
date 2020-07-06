package com.Servify.controller;

import lombok.Data;

@Data
public class RegisterDTO implements DTOServify{

    private String name;
    private String phoneNmbr;
    private String celNmbr;
    private String webPage;
    private String residence;
    private String password;

    public RegisterDTO(String aName, String aPhoneNmbr, String aCelNmbr, String aWebPage, String aResidence){
        this.name = aName;
        this.phoneNmbr = aPhoneNmbr;
        this.celNmbr = aCelNmbr;
        this.webPage = aWebPage;
        this.residence = aResidence;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {

        if(name.equals("") || phoneNmbr.equals("") || celNmbr.equals("") || webPage.equals("") || residence.equals("") ||
            password.equals("")){
            throw new EmptyDTOError();
        }
    }

    public String getName() {return name; }
    public String getPhoneNmbr() { return phoneNmbr; }
    public String getCelNmbr() { return celNmbr; }
    public String getWebPage() { return webPage; }
    public String getResidence() { return residence; }
    public String getPassword() { return password;}
}
