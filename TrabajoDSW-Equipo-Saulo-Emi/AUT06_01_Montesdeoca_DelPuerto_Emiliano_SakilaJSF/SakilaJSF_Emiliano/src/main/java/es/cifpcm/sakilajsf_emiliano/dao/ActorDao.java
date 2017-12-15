package es.cifpcm.sakilajsf_emiliano.dao;

import es.cifpcm.sakilajsf_emiliano.pojo.Actor;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author emont
 */
public interface ActorDao {

    public List<Actor> selectAll();

    public Actor insert(Actor actor);
}
