import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { FilesAwsUploadReqDto } from '../../components/files/dto/files.aws-upload.req.dto';
import { FilesAwsDeleteReqDto } from '../../components/files/dto/files.aws-delete.req.dto';
import config from '../../config';

/** AwsUploadService */
@Injectable()
export class AwsUploadService {
  /** files s3 default params */
  private readonly commonAwsParams = {
    Bucket: config.aws_bitbucket_name,
  };
  /** S3 */
  private readonly AWS_S3: AWS.S3;

  /**
   * AwsUploadService
   */
  constructor() {
    this.AWS_S3 = new AWS.S3({
      accessKeyId: config.aws_access_key_id,
      secretAccessKey: config.aws_secret_access_key,
      region: config.aws_access_region,
    });
  }

  /**
   * uploadOnAws - uploads files to s3;
   * @param {FilesAwsUploadReqDto} data
   * @returns {Promise<string> } - Location
   */
  async uploadOnAws(data: FilesAwsUploadReqDto): Promise<string> {
    try {
      /** s3 params */
      const params = {
        ACL: 'public-read',
        ...this.commonAwsParams,
        ...data,
      };

      /** uploading  file to s3 */
      const { Location } = await this.AWS_S3.upload(params, (err: AWS.AWSError) => {
        if (err) {
          throw new HttpException(err.message, err.statusCode);
        }
      }).promise();

      return Location;
    } catch (e) {
      throw new HttpException('Error in file downloading', e.message);
    }
  }

  /**
   * deleteFromAws - deletes files from s3;
   * @param {FilesAwsDeleteReqDto} data
   * @returns {Promise<void> }
   */
  async deleteFromAws(data: FilesAwsDeleteReqDto): Promise<void> {
    try {
      /** s3 params */
      const params = {
        ...this.commonAwsParams,
        ...data,
      };

      await this.AWS_S3.deleteObject(params, (err: AWS.AWSError) => {
        if (err) {
          throw new HttpException(err.message, err.statusCode);
        }
      }).promise();
    } catch (e) {
      throw new HttpException('Error in file downloading', e.message);
    }
  }

  /**
   * deleteFromAws - deletes files from s3;
   * @param {string} path
   * @returns {Promise<void> }
   */
  async putOnAws(path: string): Promise<void> {
    try {
      /** s3 params */
      const params = {
        ...this.commonAwsParams,
        ACL: 'public-read',
        Key: path,
      };

      /** creates am empty folder */
      this.AWS_S3.putObject(params, (err: AWS.AWSError) => {
        if (err) {
          throw new HttpException(err.message, err.statusCode);
        }
      }).promise();
    } catch (e) {
      throw new HttpException('Error in file downloading', e.message);
    }
  }

  /**
   * getFromAws - get files in blob format from s3;
   * @param Key
   * @param res
   */
  async getFromAws(Key: string, res): Promise<Blob> {
    try {
      const params = {
        ...this.commonAwsParams,
        Key,
      };

      const data = await this.AWS_S3.getObject(params).createReadStream();

      data.on('error', function() {
        throw new HttpException('Error in file downloading', HttpStatus.BAD_REQUEST);
      });

      data.pipe(res).on('error', function() {
        throw new HttpException('Error in file downloading', HttpStatus.BAD_REQUEST);
      });

      const regexp = /[а-яё]/i;

      res.setHeader('content-disposition', `attachment; filename=${regexp.test(Key) ? 'default' : Key}`);

      return res;
    } catch (e) {
      throw new HttpException('Error in file downloading', e.message);
    }
  }

  /**
   * getFileBuffer - get files in buffer format from s3;
   * @param Key
   */
  async getFileBuffer(Key: string) {
    try {
      const params = {
        ...this.commonAwsParams,
        Key,
      };
      return this.AWS_S3.getObject(params).promise();
    } catch (e) {
      throw new HttpException('Error in getting file buffer', e.message);
    }
  }
}
