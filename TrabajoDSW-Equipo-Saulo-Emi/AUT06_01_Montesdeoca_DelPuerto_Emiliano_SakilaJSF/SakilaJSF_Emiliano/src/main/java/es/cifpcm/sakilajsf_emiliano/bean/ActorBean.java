package es.cifpcm.sakilajsf_emiliano.bean;

import es.cifpcm.sakilajsf_emiliano.dao.ActorDao;
import es.cifpcm.sakilajsf_emiliano.dao.ActorDaoImpl;
import es.cifpcm.sakilajsf_emiliano.pojo.Actor;
import java.util.List;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.FacesComponent;
import javax.faces.context.FacesContext;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author emont
 */
@Named(value = "actorBean")
@RequestScoped
public class ActorBean extends Actor {

    @NotNull(message = "Apellidos no puede estar vacío")
    @Size(min = 1, message = "Apellido no puede estar vacio")
    @Override
    public String getLastName() {
        return super.getLastName();
    }

    @NotNull(message = "Nombre no puede estar vacío")
    @Size(min = 1, message = "Nombre no puede estar vacio")
    @Override
    public String getFirstName() {
        return super.getFirstName();
    }

    public void error() {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error!", "Chacho la base de dato no funciona, mira ver oiste!"));
    }

    public List<Actor> getActorList() {
        ActorDao a = new ActorDaoImpl();
        return a.selectAll();
    }

    public static Actor actor;

    public String save() {
        actor = new ActorDaoImpl().insert(this);
        if (actor.getActorId() == null) {
            return "/error.xhtml?faces-redirect=true";
        } else {
            return "actorDetail.xhtml?faces-redirect=true";
        }
    }

    public static Actor getActor() {
        return actor;
    }

}
