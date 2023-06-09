package com.tada.service;

import com.tada.domain.entity.Host;
import com.tada.domain.entity.Room;
import com.tada.repository.HostRepository;
import com.tada.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HostServiceImpl implements HostService{


    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public boolean joinUser(String hostId) throws Exception {
        boolean isNew = false; // 새로 회원가입하는 유저 여부
        try {
            Host host = hostRepository.findById(hostId).orElse(null); // 이미 있는 유저인지 확인
            if (host == null) { // 새로 가입하는 사람
                isNew = true;
                host = new Host();
                host.updateId(hostId);
                hostRepository.save(host);
            }
        } catch (Exception e){
            throw e;
        }

        return isNew;
    }

    @Override
    public Room getRoomByHostId(String hostId) throws Exception{
        try {
            return roomRepository.findByHost_IdAndStatusLessThan(hostId, 5);
        } catch (Exception e) {
            throw e;
        }
    }
    @Override
    public void saveRefreshToken(String hostId, String refreshToken) {
        try {
            Host host = hostRepository.findById(hostId).orElse(null);
            host.updateRefreshToken(refreshToken);
            hostRepository.save(host);
        } catch (Exception e){
            throw e;
        }
    }

    @Override
    public void logoutHost(String hostId) throws Exception{
        try {
            Host host = hostRepository.findById(hostId).orElse(null);
            host.updateRefreshToken(null);
            hostRepository.save(host);
        } catch (Exception e){
            throw e;
        }
    }

    @Override
    public String getRefreshtoken(String hostId) throws Exception {
        try {
            Host host = hostRepository.findById(hostId).orElse(null);
            if (host == null ){
                return null;
            } else {
                return host.getRefreshToken();
            }
        } catch (Exception e){
            throw e;
        }
    }

    @Override
    public void deleteHost(String hostId) throws Exception {
        try {
            Host host = hostRepository.findById(hostId).orElse(null);
            if (host != null ){
             hostRepository.deleteById(hostId);
            }
        } catch (Exception e){
            throw e;
        }
    }
}
