package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.station;

@Repository
public interface StationRepository extends JpaRepository<station, Integer> {

}
