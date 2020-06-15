package com.Servify.controller;

import lombok.Data;

@Data
public class ProviderPersonalInfoDTO implements DTOServify{

    private String originalName;
    private String newName;
    private String newPhoneNmbr;
    private String newWebPage;
    private String newCellPhoneNmbr;
    private String newResidence;

    public ProviderPersonalInfoDTO(String originalName, String newName, String newPhoneNmbr, String newWebPage, String newCellPhoneNmbr,
                                   String newResidence){

        this.originalName = originalName;
        this.newName = newName;
        this.newPhoneNmbr = newPhoneNmbr;
        this.newWebPage = newWebPage;
        this.newCellPhoneNmbr = newCellPhoneNmbr;
        this.newResidence = newResidence;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if(originalName == null || newName == null || newPhoneNmbr == null || newWebPage == null || newCellPhoneNmbr == null ||
        newResidence == null){
            throw  new EmptyDTOError();
        }
    }

    public String getProviderOriginalName() {
        return this.originalName;
    }

    public String getNewProviderName() {
        return this.newName;
    }

    public String getNewPhoneNmbr() {
        return this.newPhoneNmbr;
    }

    public String getNewWebPage() {
        return this.newWebPage;
    }

    public String getNewCellPhoneNmbr() {
        return this.newCellPhoneNmbr;
    }

    public String getNewResidence() {
        return this.newResidence;
    }
}
