package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.Route;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    List<Route> findAllByDeletedAtIsNull();
    Optional<Route> findByRouteIdAndDeletedAtIsNull(Integer id);
}
