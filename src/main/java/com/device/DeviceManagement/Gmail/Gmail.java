package com.device.DeviceManagement.Gmail;


import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Properties;    

public class Gmail {
public boolean Send(String fromEmailAddress, String toEmailAddress,String password,String Text,HashSet<String> file) throws IOException
	
{
	 
	// Recipient's email ID needs to be mentioned.
    String to = toEmailAddress;

    // Sender's email ID needs to be mentioned
    String from = fromEmailAddress;

    // Assuming you are sending email from through gmails smtp

    // Get system properties
    Properties properies = new Properties();
	   properies.put("mail.smtp.host", "smtp.gmail.com");
	   properies.put("mail.smtp.port", "465");
	   properies.put("mail.smtp.auth", "true");
	   properies.put("mail.smtp.starttls.enable", "true");
	   properies.put("mail.smtp.starttls.required", "true");
	   properies.put("mail.smtp.ssl.protocols", "TLSv1.2");
	   properies.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

    // Get the Session object
    Session session = Session.getInstance(properies, new Authenticator() {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(fromEmailAddress, password);
        }
    });


    // Used to debug SMTP issues
   // session.setDebug(true);

    try {
        // Create a default MimeMessage object.
        MimeMessage message = new MimeMessage(session);

        // Set From: header field of the header.
        message.setFrom(new InternetAddress(from));

        // Set To: header field of the header.
       
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
        

        // Now set the actual message
       // message.setText("This is actual message  good");
        message.setSentDate(new Date());
        
        Multipart multipart = new MimeMultipart();
        
       
        
        MimeBodyPart incomeText = new MimeBodyPart();
        incomeText.setContent(Text, "text/html");
        multipart.addBodyPart(incomeText);
        
       
        if(file.size()!=0)
    	{
            Iterator<String> i=file.iterator(); 
            while(i.hasNext())  
            { 
            	MimeBodyPart incometax = new MimeBodyPart();
                incometax.attachFile(new File("C:/ImageExamSystem/"+i.next()));
                multipart.addBodyPart(incometax);		
            	
            } 
            
 
        	 	
    	}
        
      
        
        
        message.setContent(multipart);
    	
        // Set Subject: header field
       
        
        

       // System.out.println("sending...");
        // Send message
        Transport.send(message);
        return true;
       
       // System.out.println("Sent message successfully....");
    } catch (MessagingException mex) {
        mex.printStackTrace();
        return false;
    }

}
	

}