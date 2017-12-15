/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_emiliano.dao;

import es.cifpcm.sakilajsf_emiliano.pojo.Customer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

/**
 *
 * @author emont
 */
public class CustomerDaoImpl implements CustomerDao {

    public String dbUrl;
    public String dbUser;
    public String dbPassword;
    public String driverClassName;

    public List<Customer> selectAll() {
        List<Customer> lista = new ArrayList<>();
        ResourceBundle rb = ResourceBundle.getBundle("sakila");
        dbUrl = rb.getString("database.url");
        dbUser = rb.getString("database.user");
        dbPassword = rb.getString("database.password");
        driverClassName = rb.getString("database.driver");

        /// Instanciamos la clase
        try {
            Class.forName(driverClassName);

        } catch (Exception e) {
        }

        /// Connection string 
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
            /// La query para para devolver los actores
            String query = "select * from customer";
            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                /// Ejecutar la query
                ResultSet rs = pstmt.executeQuery();
                /// Mientras tenga resultados añadir a una lista
                while (rs.next()) {
                    Customer c = new Customer();
                    c.setCustomer_id(rs.getInt(1));
                    c.setStore_id(rs.getInt(2));
                    c.setFirst_name(rs.getString(3));
                    c.setLast_name(rs.getString(4));
                    c.setEmail(rs.getString(5));
                    c.setAddres_id(rs.getInt(6));
                    c.setActive(rs.getInt(7));
                    c.setCreate_time(rs.getDate(8));
                    c.setLast_update(rs.getDate(9));
                    lista.add(c);
                }
            }
        } catch (SQLException ex) {
        }

        return lista;
    }

    public Customer insert(Customer customer) {
        Customer c = customer;

        /// Instanciamos la clase
        try {
            Class.forName("com.mysql.jdbc.Driver");

        } catch (Exception e) {
        }

        /// Connection string 
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/sakila", "2daw", "2daw")) {
            /// La query para para devolver los actores
            String query = "INSERT INTO `customer`(`store_id`, `first_name`, `last_name`, `email`, `address_id`, `active`) VALUES (?,?,?,?,?,?)";
            try (PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                pstmt.setInt(1, c.getStore_id());
                pstmt.setString(2, c.getFirst_name());
                pstmt.setString(3, c.getLast_name());
                pstmt.setString(4, c.getEmail());
                pstmt.setInt(5, c.getAddres_id());
                pstmt.setInt(6, c.getActive());

                /// Ejecutar la query
                pstmt.executeUpdate();

                ResultSet rs = pstmt.getGeneratedKeys();

                if (rs.next()) {
                    Short id = rs.getShort(1);
                    c.setCustomer_id(Integer.parseInt(id.toString()));
                }
            }
        } catch (SQLException ex) {
        }

        return c;

    }
}
