package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.Station;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

}
