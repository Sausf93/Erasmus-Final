/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_emiliano.bean;

import es.cifpcm.sakilajsf_emiliano.dao.CustomerDao;
import es.cifpcm.sakilajsf_emiliano.dao.CustomerDaoImpl;
import es.cifpcm.sakilajsf_emiliano.pojo.Customer;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import java.util.List;

/**
 *
 * @author emont
 */
@Named(value = "customerBean")
@RequestScoped
public class CustomerBean extends Customer {

    /**
     * Creates a new instance of CustomerBean
     */
    public List<Customer> getCustomerList() {
        CustomerDao c = new CustomerDaoImpl();
        return c.selectAll();
    }

    public static Customer customer;

    public String save() {
        customer = new CustomerDaoImpl().insert(this);
        if (customer.getCustomer_id() == null) {
            return "/error.xhtml?faces-redirect=true";
        } else {
            return "actorDetail.xhtml?faces-redirect=true";
        }
    }

    public static Customer getActor() {
        return customer;
    }

}
