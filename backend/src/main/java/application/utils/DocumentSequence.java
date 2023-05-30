package application.utils;

import application.db.models.Sequence;

import java.io.File;
import java.io.IOException;

public class DocumentSequence {
    private CSVRepository<Sequence> repo;

    DocumentSequence(String code) throws IOException {
        repo = new CSVRepository<Sequence>("documentSequence.csv", Sequence.class);
    }


}
