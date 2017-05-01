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
//            stus.add(new Student("全境封锁", 100));
//            stus.add(new Student("Tom", 78));
//            stus.add(new Student("Jerry", 88));
//            stus.add(new Student("GTA5", 98));
//            stus.add(new Student("Assassin's Creed IV : Black Flag", 78));
//            stus.add(new Student("AskTao", 68));
//            stus.add(new Student("RedAlert", 58));
//            stus.add(new Student("Cal Of Duty", 40));
//            stus.add(new Student("Advanced War", 99));
//            stus.add(new Student("波斯王子", 65));
//            
//        } catch (ScoreOutOfBoundsException e) {
//            System.out.println("由于分数越界，某些同学成绩录入失败");
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
           System.out.println("该目录已经存在！");
           r = true;
            
        } else {
            System.out.println("该目录不存在，将要创建！");
            
            if (r = dir.mkdir()) {
                System.out.println("目录创建成功！");
                
            } else {
                System.out.println("目录创建失败！");
                
            }//if-else            
            
        }//if-else 
        
        File f = new File(FILEPATH + "//JavaFile.txt");
        String parentDirstr = f.getParent();
        
        System.out.println("检测父目录是否存在...");
        File parentDir = new File(parentDirstr);
        if (!parentDir.exists()) {
            System.out.println("父目录不存在！ 正在创建目录...");
            if (parentDir.mkdir()) {
                System.out.println("父目录创建成功！");
                
            } else {
                System.out.println("父目录创建失败！");
                
            }//if-else
            
        } else {
            System.out.println("父目录已经存在！");
            
        }//if-else
        
        if (f.exists()) {
            System.out.println("该文件已存在");
            
        } else {
            System.out.println("该文件还不存在， 将要进行创建");
            
            try {
                if (r = f.createNewFile()) {
                    System.out.println("文件创建成功！");
                    
                } else {
                    System.out.println("文件创建失败！");
                    
                }//if-else
                
            } catch (IOException e) {
                System.out.println("创建文件失败，发生异常！");
                
            }//try-catch
            
        }//if-else
        
        try {
            
            
            
            Writer w = new FileWriter(f);
            System.out.println("创建Writer成功！");
            
            for (int i = 0; i < stus.size(); i++) {
                w.write(stus.get(i).getName() + "\t" + stus.get(i).getScore() + "\t" + stus.get(i).getGrade() + "\n");
                
            }//for
            
            w.close();
            System.out.println("Writer已经关闭\n信息写入成功！");
            
        } catch (IOException e) {
            System.out.println("创建Writer失败！ 因为：" + e.getMessage());
            
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
