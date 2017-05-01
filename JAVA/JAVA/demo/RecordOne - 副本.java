package com.daoshengwanwu.lesson17.recordone;


import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.daoshengwanwu.lesson16.recordone.ScoreOutOfBoundsException;
import com.daoshengwanwu.lesson16.recordone.Student;


public class RecordOne {    
    private static final String FILEPATH = "F://JavaFileTest";
    
    
    public static void main(String[] args) {
//        List<Student> stus = new ArrayList<Student>();
//        
//        try {
//            stus.add(new Student("ȫ������", 100));
//            stus.add(new Student("Tom", 78));
//            stus.add(new Student("Jerry", 88));
//            stus.add(new Student("GTA5", 98));
//            stus.add(new Student("Assassin's Creed IV : Black Flag", 78));
//            stus.add(new Student("AskTao", 68));
//            stus.add(new Student("RedAlert", 58));
//            stus.add(new Student("Cal Of Duty", 40));
//            stus.add(new Student("Advanced War", 99));
//            stus.add(new Student("��˹����", 65));
//            
//        } catch (ScoreOutOfBoundsException e) {
//            System.out.println("���ڷ���Խ�磬ĳЩͬѧ�ɼ�¼��ʧ��");
//            
//        }//try-catch
//        
//        saveData(stus);
//        
//        File f = new File(FILEPATH + "//JavaFile.txt");
//        
//        if (f.exists()) {
//            try {
//                Reader reader = new FileReader(f);
//                char[] cbuf = new char[255];   
//                
//                reader.read(cbuf);
//
//                reader.close();
//                
//                String temp = new String(cbuf);
//                String[] stuStrs = temp.split("\n");
//                for (int i = 0; i < stuStrs.length - 1; i++) {
//                    String[] s = stuStrs[i].split("\t");
//                    System.out.println(s[0]);
//                    System.out.println(s[1]);
//                    System.out.println(s[2]);
//                    
//                }//for
//                
//                
//            }catch (IOException e) {
//                e.printStackTrace();                
//                
//            }//try-catch
//            
//        }//if
//        
//        File dir = new File("F://FileTest//JavaFile//");
//        if (!dir.exists()) {
//            dir.mkdirs();
//            
//        }//if
//        
//        for (String str : dir.list()) {
//            System.out.println(str);
//            
//        }//for
//        
//        String path = FILEPATH;
//        File ff = new File(path);
//        String[] flst = ff.list();
//        for (int i = 0; i < flst.length; i++) {
//            File cf = new File(flst[i]);
//            
//        }
        
        displayAllFile("F://FileTest//");
        
    }//main
    
    
    public static void saveData(List<Student> stus) {
        File dir = new File(FILEPATH);
        boolean r = false;
        
        if (dir.exists()) {
           System.out.println("��Ŀ¼�Ѿ����ڣ�");
           r = true;
            
        } else {
            System.out.println("��Ŀ¼�����ڣ���Ҫ������");
            
            if (r = dir.mkdir()) {
                System.out.println("Ŀ¼�����ɹ���");
                
            } else {
                System.out.println("Ŀ¼����ʧ�ܣ�");
                
            }//if-else            
            
        }//if-else 
        
        File f = new File(FILEPATH + "//JavaFile.txt");
        String parentDirstr = f.getParent();
        
        System.out.println("��⸸Ŀ¼�Ƿ����...");
        File parentDir = new File(parentDirstr);
        if (!parentDir.exists()) {
            System.out.println("��Ŀ¼�����ڣ� ���ڴ���Ŀ¼...");
            if (parentDir.mkdir()) {
                System.out.println("��Ŀ¼�����ɹ���");
                
            } else {
                System.out.println("��Ŀ¼����ʧ�ܣ�");
                
            }//if-else
            
        } else {
            System.out.println("��Ŀ¼�Ѿ����ڣ�");
            
        }//if-else
        
        if (f.exists()) {
            System.out.println("���ļ��Ѵ���");
            
        } else {
            System.out.println("���ļ��������ڣ� ��Ҫ���д���");
            
            try {
                if (r = f.createNewFile()) {
                    System.out.println("�ļ������ɹ���");
                    
                } else {
                    System.out.println("�ļ�����ʧ�ܣ�");
                    
                }//if-else
                
            } catch (IOException e) {
                System.out.println("�����ļ�ʧ�ܣ������쳣��");
                
            }//try-catch
            
        }//if-else
        
        try {
            
            
            
            Writer w = new FileWriter(f);
            System.out.println("����Writer�ɹ���");
            
            for (int i = 0; i < stus.size(); i++) {
                w.write(stus.get(i).getName() + "\t" + stus.get(i).getScore() + "\t" + stus.get(i).getGrade() + "\n");
                
            }//for
            
            w.close();
            System.out.println("Writer�Ѿ��ر�\n��Ϣд��ɹ���");
            
        } catch (IOException e) {
            System.out.println("����Writerʧ�ܣ� ��Ϊ��" + e.getMessage());
            
        }//try-catch       
        
    }//getData
    
    
    public static List<Student> readStudent(File f) {
        return new ArrayList<Student>();
        
    }//readStudent
    
    
    public static void displayAllFile(String path) {  //digui
        File dir = new File(path);
        
        if (dir.exists()) {
            if (dir.isDirectory()) {
                String[] files = dir.list();
            
                for (int i = 0; i < files.length; i++) {
                    File f = new File(path + "//" + files[i]);
                    if (f.isFile()) {
                        System.out.println(path + "//" + files[i]);
                        
                    } else if (f.isDirectory()) {
                        displayAllFile(path + files[i]);
                        
                    }//if-else
                
                }//for
                
            } else {
                System.out.println(path);
                
            }//if
            
        }//if
        
    }//displayAllFile
    
    
}//class_RecordOne
