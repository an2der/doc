package me.phoibe.doc.cms.service.impl;

import me.phoibe.doc.cms.dao.PhoibeDirectoryMapper;
import me.phoibe.doc.cms.dao.PhoibeDocDirMapper;
import me.phoibe.doc.cms.domain.po.PhoibeDirectory;
import me.phoibe.doc.cms.domain.po.PhoibeDocDir;
import me.phoibe.doc.cms.service.PhoibeDirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class PhoibeDirectoryServiceImpl implements PhoibeDirectoryService {

    @Autowired
    private PhoibeDocDirMapper phoibeDocDirMapper;

    @Autowired
    private PhoibeDirectoryMapper phoibeDirectoryMapper;

    @Override
    public void addDirectory(PhoibeDirectory phoibeDirectory) {
        phoibeDirectory.setCreateTime(new Date());
        phoibeDirectoryMapper.insertSelective(phoibeDirectory);
    }

    @Override
    public void modifyDirectory(PhoibeDirectory phoibeDirectory) {
        phoibeDirectory.setUpdateTime(new Date());
        phoibeDirectoryMapper.updateByPrimaryKeySelective(phoibeDirectory);
    }

    @Override
    @Transactional
    public void removeDirectory(Long dirId) {
        phoibeDirectoryMapper.deleteByPrimaryKey(dirId);
        phoibeDocDirMapper.deleteByDirId(dirId);

    }
    @Override
    @Transactional
    public void removeDocDirById(Long docid) {
        phoibeDocDirMapper.deleteByDocId(docid);
    }

    @Override
    @Transactional
    public void moveDirectory(long[] docidstr, Long directoryid) {
        phoibeDocDirMapper.deleteByDocIdArray(docidstr);
        for (long docid:docidstr) {
            PhoibeDocDir phoibeDocDir =new PhoibeDocDir();
            phoibeDocDir.setDocumentId(docid);
            phoibeDocDir.setDirectoryId(directoryid);
            phoibeDocDirMapper.insertSelective(phoibeDocDir);
        }
    }

    @Override
    public List<PhoibeDirectory> fetchPhoibeDirectoryList(Long userId) {
        return phoibeDirectoryMapper.selectByList(userId);
    }
    @Override
    public PhoibeDirectory selectByDirName(String dirName,Long userId) {
        return phoibeDirectoryMapper.selectByDirName(dirName,userId);
    }
}
